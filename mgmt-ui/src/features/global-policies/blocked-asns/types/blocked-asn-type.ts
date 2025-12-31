export type BlockedAsnType = {
  id: string;
  asn: number;
  asnName: string;
  asnOrg: string;
  scope: string;
  serviceName: string;
  accountId: string;
  reason: string;
  reasonNotes: string | null;
  blockType: string;
  severity: number;
  blockedAt: string;
  expiresAt: string;
  createdBy: string;
  lastHitAt: string;
  hitCount: number;
};
