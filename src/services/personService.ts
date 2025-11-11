const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getPersonDetails = async (id: string, lang: string) => {
  try {
    const response = await fetch(`${BASE_URL}/person/${id}?lang=${lang}`, {
      next: { revalidate: 86400 },
    });
    if (!response.ok) {
      const text = await response.text();
      console.error(
        `Failed to fetch person details for id ${id}:`,
        response.status,
        text
      );
      throw new Error(`Failed to fetch person details for id ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching person details for id ${id}:`, error);
    throw error;
  }
};
