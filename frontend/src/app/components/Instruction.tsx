export const Instruction = () => {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-10">
        <h2 className="text-3xl font-bold">Welcome to movie search app!</h2>
        <div className="flex flex-col gap-5">
          <h3 className="text-xl">Instruction: </h3>
          <p>
            1. To search for movies, start by jumping to the &apos;Movie&apos; page from
            the menu above.
          </p>
          <p>
            2. Enter the keyword you want to search for and click the &apos;Search&apos;
            button.
          </p>
          <p>3. You can view detailed info for each movie by click on it.</p>
        </div>
      </div>
    );
}