const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getCompanyDetails = async (id: string, lang: string) => {
  try {
    const response = await fetch(`${BASE_URL}/company/${id}?lang=${lang}`, {
      next: { revalidate: 86400 },
    });
    if (!response.ok) {
      const text = await response.text();
      console.error(
        `Failed to fetch company details for id ${id}:`,
        response.status,
        text
      );
      throw new Error(`Failed to fetch company details for id ${id}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching company details for id ${id}:`, error);
    throw error;
  }
};
