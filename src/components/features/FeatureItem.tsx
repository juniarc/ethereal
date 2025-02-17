"use client";

interface FeatureItemProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  title: string;
  description: string;
}

export default function FeatureItem({
  icon,
  title,
  description,
}: FeatureItemProps) {
  return (
    <div className="w-auto md:w-auto md:min-w-80 lg:w-[20vw] p-10 border dark:border-transparent border-foreground group hover:border hover:border-[rgba(255,69,255,0.3)] transition-colors ease-out duration-500 dark:bg-white/5 bg-white/35 backdrop-blur-xl rounded-2xl flex flex-col justify-center items-center gap-10">
      <div>{icon}</div>
      <p className="font-bold text-3xl">{title}</p>
      <p className="font-extralight text-center">{description}</p>
    </div>
  );
}
