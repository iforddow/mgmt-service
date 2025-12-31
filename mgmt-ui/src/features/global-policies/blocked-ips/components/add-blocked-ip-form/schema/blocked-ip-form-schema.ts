import * as yup from "yup";

/** Basic IPv4 + IPv6 regex (form-level, not perfect by design) */
const ipRegex = /^(?:\d{1,3}\.){3}\d{1,3}$|^(?:[a-fA-F0-9:]+:+)+[a-fA-F0-9]+$/;

export const blockReasonLabels = [
  "DDoS Attack Attempt",
  "Brute Force Attack",
  "Credential Stuffing",
  "Port Scanning",
  "Vulnerability Scanning",
  "Excessive Requests / Rate Limit Abuse",
  "Malicious Bot Activity",
  "Web Scraping Abuse",
  "Spam Submission",
  "Fraud Attempt",
  "Payment Abuse",
  "Account Enumeration",
  "Unauthorized Access Attempt",
  "Exploitation Attempt",
  "Malware Distribution",
  "Command and Control Traffic",
  "Proxy / VPN Abuse",
  "Tor Exit Node",
  "Open Proxy",
  "Hosting Provider Abuse",
  "Data Exfiltration Attempt",
  "Reconnaissance Activity",
  "API Abuse",
  "Policy Violation",
  "Geo-Restricted Access Violation",
  "Suspicious Behavior",
  "Known Malicious IP",
  "Threat Intelligence Feed Match",
  "Manual Administrative Block",
] as const;

export const BlockedIpFormSchema = yup.object().shape({
  ipAddress: yup
    .string()
    .trim()
    .matches(ipRegex, "Invalid IP address")
    .required("IP address is required"),

  cidrRange: yup
    .number()
    .nullable()
    .typeError("CIDR range must be a number")
    .min(0, "CIDR range must be at least 0")
    .max(128, "CIDR range cannot exceed 128"),

  scope: yup
    .string()
    .oneOf(["global", "service"])
    .required("Scope is required"),

  serviceName: yup
    .string()
    .when("scope", (scopeValue: any, schema) =>
      scopeValue === "service"
        ? schema.required("Service name is required for service scope")
        : schema.nullable(),
    ),

  reason: yup
    .string()
    .oneOf(blockReasonLabels as unknown as string[])
    .required("Reason is required"),

  reasonNotes: yup
    .string()
    .max(500)
    .nullable()
    .transform((v) => (v === "" ? null : v)),

  blockType: yup
    .string()
    .oneOf(["permanent", "temporary"])
    .required("Block type is required"),

  severity: yup
    .number()
    .typeError("Severity is required")
    .integer()
    .min(1)
    .max(5)
    .required("Severity is required"),

  expiresAt: yup
    .string()
    .nullable()
    .when("blockType", (blockTypeValue: any, schema) =>
      blockTypeValue === "temporary"
        ? schema.required("Temporary blocks require an expiration date")
        : schema.nullable(),
    ),
});
