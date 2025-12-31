export type BlockedIpType = {
  id: string;
  ipAddress: string;
  cidrRange: number | null;
  scope: string;
  serviceName: string | null;
  reason: string;
  reasonNotes: string | null;
  blockType: string;
  severity: number;
  blockedAt: string;
  expiresAt: string | null;
  createdBy: string;
  lastHitAt: string | null;
  hitCount: number;
};
