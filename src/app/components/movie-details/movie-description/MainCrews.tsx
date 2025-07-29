import { IMovieDetails } from "@/types/tmdb";
import Image from "next/image";
import { MotionLink } from "../../ui/MotionLink";

type MainCrewsProps = {
  crews: IMovieDetails["credits"]["crew"];
};

export const MainCrews = ({ crews }: MainCrewsProps) => {
  const jobSections = ["Director", "Producer", "Writer"];

  return (
    <div className="text-base-bg space-y-4 text-sm grid grid-cols-1 md:grid-cols-3 gap-8">
      {jobSections.map((jobTitle) => {
        const members = crews.filter((c) => c.job === jobTitle);
        return (
          members.length > 0 && (
            <div key={jobTitle}>
              <h3 className="text-lg font-semibold mb-2">
                {jobTitle}
                {members.length > 1 ? "s" : ""}
              </h3>
              <div className="flex flex-col gap-4">
                {members.map((person) => (
                  <MotionLink
                    key={person.id}
                    href={`/person/${person.id}`}
                    className="flex items-center gap-2 text-base-bg"
                    whileHover={{ scale: 1.05, opacity: 1 }}
                  >
                    {person.profile_path ? (
                      <Image
                        key={person.id}
                        src={`https://image.tmdb.org/t/p/w92${person.profile_path}`}
                        alt={person.name}
                        width={50}
                        height={50}
                        className="rounded-full object-cover aspect-square"
                      />
                    ) : (
                      <div className="w-[50px] h-[50px] bg-accent-bg rounded-full flex items-center justify-center">
                        <span className="text-xs">{person.name.charAt(0)}</span>
                      </div>
                    )}
                    <span className="text-sm">{person.name}</span>
                  </MotionLink>
                ))}
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};
