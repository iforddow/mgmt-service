export type BlockedIpType = {
  id: string;
  ipAddress: string;
  cidrRange: string;
  scope: string;
  serviceName: string;
  accountId: string;
  reason: string;
  blockType: string;
  severity: number;
  blockedAt: string;
  expiresAt: string;
  createdBy: string;
  lastHitAt: string;
  hitCount: number;
  isActive: boolean;
};
