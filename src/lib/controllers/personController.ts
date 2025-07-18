import { tmdbFetch } from "../tmdbFetcher";
export const getPersonDetails = async (id: string, lang: string) => {
  try {
    const personDetails = await tmdbFetch(`/person/${id}`, {
      language: lang,
    });

    if (!personDetails) {
      throw new Error(`Person with id ${id} not found`);
    }

    return personDetails;
  } catch (error) {
    console.error("Error fetching person details:", error);
    throw error;
  }
};
