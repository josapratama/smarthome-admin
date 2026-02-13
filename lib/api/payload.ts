export async function readPayload(res: Response): Promise<unknown> {
  const ct = res.headers.get("content-type") ?? "";
  const isJson = ct.includes("application/json");

  if (isJson) {
    try {
      return await res.json();
    } catch {
      return null;
    }
  }

  try {
    return await res.text();
  } catch {
    return null;
  }
}
