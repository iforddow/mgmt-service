import type { BlockedIpFilterState } from "../blocked-ip-advanced-filter";

/* 
A function to process the entire filter state into a query string.

@author IFD
@since 2026-01-03
*/
export function processFilters(filters: BlockedIpFilterState): string | null {
  let finalFilterString = "";

  finalFilterString += proccessStringList(filters.ipList, "ipAddresses") ?? "";
  // Strip leading "/" from CIDR ranges before sending to backend
  const cleanedCidrs = filters.cidrRanges.map((c) => c.replace(/^\//, ""));
  finalFilterString += proccessStringList(cleanedCidrs, "cidrRanges") ?? "";
  finalFilterString += proccessStringList(filters.scopes, "scopes") ?? "";
  finalFilterString +=
    proccessStringList(filters.blockTypes, "blockTypes") ?? "";
  finalFilterString += proccessStringList(filters.reasons, "reasons") ?? "";
  finalFilterString +=
    proccessStringList(filters.serviceNames, "serviceNames") ?? "";

  // Remove trailing semicolon if present
  if (finalFilterString.endsWith(";")) {
    finalFilterString = finalFilterString.slice(0, -1);
  }

  console.log("Created filter string: ", finalFilterString);

  return finalFilterString === "" ? null : finalFilterString;
}

/* 
A helper function to process the IP address filter list into a query string.

@author IFD
@since 2026-01-03
*/
export function proccessStringList(
  list: string[],
  filter: string,
): string | null {
  if (list.length === 0) return null;

  let filterString = filter + "=";

  for (let i = 0; i < list.length; i++) {
    filterString += list[i];
    if (i < list.length - 1) {
      filterString += ",";
    } else {
      filterString += ";";
    }
  }
  return filterString;
}
