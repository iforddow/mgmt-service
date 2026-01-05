package com.iforddow.mgmt.common.service;

import com.iforddow.mgmt.common.config.StorageConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.ResponseBytes;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.S3Configuration;
import software.amazon.awssdk.services.s3.model.*;

import java.io.IOException;
import java.net.URI;
import java.util.UUID;

/**
* A service for handling file storage operations using S3-compatible storage.
*
* @author IFD
* @since 2026-01-04
*/
@Service
@RequiredArgsConstructor
public class StorageService {

    private final StorageConfig storageConfig;

    /**
    * A private method to create and configure an S3 client.
    *
    * @return Configured S3Client instance.
    *
    * @author IFD
    * @since 2026-01-04
    * */
    private S3Client createS3Client() {
        AwsBasicCredentials awsBasicCredentials = AwsBasicCredentials.create(
                storageConfig.getAccessKey(),
                storageConfig.getSecretKey()
        );

        S3Configuration serviceConfiguration = S3Configuration.builder()
                .pathStyleAccessEnabled(true)
                .build();

        return S3Client.builder()
                .credentialsProvider(StaticCredentialsProvider.create(awsBasicCredentials))
                .endpointOverride(URI.create(storageConfig.getEndpoint()))
                .serviceConfiguration(serviceConfiguration)
                .region(Region.US_EAST_1)
                .build();
    }

    /**
    * A method to upload a file to S3 storage.
    *
    * @param file The MultipartFile to be uploaded.
    * @param isPublic A boolean indicating if the file should be publicly accessible.
    * @return The URL of the uploaded file.
    * @throws IOException If an error occurs during upload.
    *
    * @author IFD
    * @since 2026-01-04
    * */
    public String uploadFile(MultipartFile file, boolean isPublic) throws IOException {
        try (S3Client s3Client = createS3Client()) {

            // Verify bucket exists
            try {
                s3Client.headBucket(HeadBucketRequest.builder()
                        .bucket(storageConfig.getBucketName())
                        .build());
            } catch (NoSuchBucketException e) {
                throw new IOException("Bucket does not exist: " + storageConfig.getBucketName(), e);
            }

            String keyName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            PutObjectRequest.Builder putObjectRequestBuilder = PutObjectRequest.builder()
                    .bucket(storageConfig.getBucketName())
                    .key(keyName)
                    .contentType(file.getContentType());

            if (isPublic) {
                putObjectRequestBuilder.acl(ObjectCannedACL.PUBLIC_READ);
            }

            s3Client.putObject(
                    putObjectRequestBuilder.build(),
                    RequestBody.fromBytes(file.getBytes())
            );

            return String.format("%s/%s", storageConfig.getPublicUrl(), keyName);

        } catch (S3Exception e) {
            throw new IOException("Failed to upload file to S3: " + e.awsErrorDetails().errorMessage(), e);
        }
    }

    /**
    * A method to delete a file from S3 storage.
    *
    * @param keyName The key name of the file to be deleted.
    * @throws IOException If an error occurs during deletion.
    *
    * @author IFD
    * @since 2026-01-04
    * */
    public void deleteFile(String keyName) throws IOException {
        try (S3Client s3Client = createS3Client()) {

            DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                    .bucket(storageConfig.getBucketName())
                    .key(keyName)
                    .build();

            s3Client.deleteObject(deleteObjectRequest);

        } catch (S3Exception e) {
            throw new IOException("Failed to delete file from S3: " + e.awsErrorDetails().errorMessage(), e);
        }
    }

    /**
    * A method to replace an existing file in S3 storage with a new file.
    *
    * @param keyName The key name of the file to be replaced.
    * @param newFile The new MultipartFile to upload.
    * @param isPublic A boolean indicating if the new file should be publicly accessible.
    * @throws IOException If an error occurs during the replacement process.
    *
    * @author IFD
    * @since 2026-01-04
    * */
    public void replaceFile(String keyName, MultipartFile newFile, boolean isPublic) throws IOException {
        deleteFile(keyName);
        uploadFile(newFile, isPublic);
    }

    /**
    * A method to retrieve a file from S3 storage.
    *
    * @param keyName The key name of the file to be retrieved.
    * @return A byte array containing the file data.
    * @throws IOException If an error occurs during retrieval.
    *
    * @author IFD
    * @since 2026-01-04
    * */
    public byte[] getFile(String keyName) throws IOException {
        try (S3Client s3Client = createS3Client()) {

            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                    .bucket(storageConfig.getBucketName())
                    .key(keyName)
                    .build();

            ResponseBytes<GetObjectResponse> objectBytes = s3Client.getObjectAsBytes(getObjectRequest);
            return objectBytes.asByteArray();

        } catch (NoSuchKeyException e) {
            throw new IOException("File not found: " + keyName, e);
        } catch (S3Exception e) {
            throw new IOException("Failed to retrieve file from S3: " + e.awsErrorDetails().errorMessage(), e);
        }
    }

    /**
    * A method to generate the public URL of a file stored in S3.
    *
    * @param keyName The key name of the file.
    * @return The public URL of the file.
    *
    * @author IFD
    * @since 2026-01-04
    * */
    public String getFileUrl(String keyName) {
        return String.format("%s/%s", storageConfig.getPublicUrl(), keyName);
    }
}
