import { IMovieDetails } from "@/types/tmdb";
import { MotionLink } from "../../ui/MotionLink";
import Image from "next/image";
import { motion } from "motion/react";

type ProductionCompaniesProps = {
  companies: IMovieDetails["production_companies"];
};

export const ProductionCompanies = ({
  companies,
}: ProductionCompaniesProps) => {
  
  const imageVariants = {
    initial: {
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      filter: "grayscale(1)",
    },
    hover: {
      boxShadow: "0 0 15px rgba(255,255,255,0.5)",
      filter: "grayscale(0)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="text-base-bg">
      <h3 className="text-xl font-bold mb-2">Production Companies</h3>
      <div className="flex items-start flex-wrap gap-4">
        {companies.map((company) => (
          <MotionLink
            key={company.id}
            href={`/company/${company.id}`}
            className="flex flex-col items-center gap-2"
            initial="initial"
            whileHover="hover"
          >
            <motion.div
              className="bg-base-fg/40 border border-base-bg/20 rounded p-2 flex items-center gap-3"
              variants={imageVariants}
            >
              <div className="bg-white/80 p-2 rounded w-[75px] aspect-video flex items-center justify-center">
                {company.logo_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w92${company.logo_path}`}
                    alt={company.name}
                    width={75}
                    height={75}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-xs text-base-fg text-center">
                      No logo
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
            <span className="text-xs text-base-bg text-center break-words w-[75px]">
              {company.name}
            </span>
          </MotionLink>
        ))}
      </div>
    </div>
  );
};
