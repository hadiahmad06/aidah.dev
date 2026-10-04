type Role = {
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
};

const roles: Role[] = [
  {
    title: "Ultrasonic Cleaner Lead",
    organization: "Minnesota Nanofabrication Club · University of Minnesota",
    location: "Minneapolis, MN",
    startDate: "September 2026",
    endDate: "Present",
  },
  {
    title: "Undergraduate Teaching Assistant",
    organization: "University of Minnesota · Department of Electrical & Computer Engineering",
    location: "Minneapolis, MN",
    startDate: "August 2026",
    endDate: "Present",
  },
  {
    title: "Retail / Food Service Experience",
    organization: "McDonalds · Blaze Pizza · Planet Fitness · Target · Walmart",
    location: "Lakeville, MN",
    startDate: "September 2022",
    endDate: "May 2026",
  },
];

export default function Experience() {
  return (
    <section id="Experience" className="text-white py-24 px-12 sm:px-32 flex flex-col gap-6 w-full mx-auto">
      <h1 className="text-5xl font-bold text-center mb-4 sm:mb-0">Experience</h1>
      {roles.map((role) => (
        <div key={role.title} className="flex flex-col gap-1">
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-6">
            <h2 className="text-2xl font-bold text-start">{role.title}</h2>
            <span className="text-lg text-gray-400 font-medium shrink-0">{role.location}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-6">
            <span className="text-lg text-gray-300">{role.organization}</span>
            <span className="text-sm text-gray-500 shrink-0">
              {role.startDate} - {role.endDate}
            </span>
          </div>
        </div>
      ))}
    </section>
  );
}
