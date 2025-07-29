import { tmdbFetch } from "../tmdbFetcher";
export const getCompanyDetails = async (id: string, lang: string) => {
  try {
    const companyDetails = await tmdbFetch(`/company/${id}`, {
      language: lang,
    });

    if (!companyDetails) {
      throw new Error(`Company with id ${id} not found`);
    }

    return companyDetails;
  } catch (error) {
    console.error("Error fetching company details:", error);
    throw error;
  }
};
