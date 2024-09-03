function timeout<T>(response: T, milliseconds: number): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(response), milliseconds));
}

export async function searchHotel() {
  return await timeout({ status: "success" }, 1000);
}
