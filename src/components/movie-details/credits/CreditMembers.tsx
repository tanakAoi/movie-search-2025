"use client";

import { ICredit } from "@/types/tmdb";
import { PersonCard } from "./PersonCard";
import { useState } from "react";
import { ChevronLeft } from "@/components/ui/icons/MaterialSymbols";
import { motion } from "motion/react";

interface CreditMembersProps {
  type: "cast" | "crew";
  members: ICredit["cast"] | ICredit["crew"];
}

export const CreditMembers = ({ type, members }: CreditMembersProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2>
          {type === "cast" ? "Cast" : "Crew"} ({members.length})
        </h2>
        <div className="block sm:hidden">
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className={isOpen ? "rotate-270 " : "rotate-90"}
          >
            <ChevronLeft width={20} height={20} fill={"var(--color-base-fg)"} />
          </motion.button>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-5">
          {members.map((member, index) => (
            <motion.div
              key={`${type}-${member.id}-${member.name}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
            >
              <PersonCard
                name={member.name}
                imagePath={member.profile_path}
                label={
                  type === "cast"
                    ? (member as { character: string }).character
                    : (member as { job: string }).job
                }
              />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
