import Image from 'next/image';

import Logo from '@/public/img/logo.png';

export default async function DashboardPage() {
  const LOGO_SIZE = 32;
  const LOGO_SIZE_MD = 48;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <Image
          src={Logo}
          alt="Home"
          width={LOGO_SIZE}
          height={LOGO_SIZE}
          className={`md:w-[${LOGO_SIZE_MD}px] md:h-[${LOGO_SIZE_MD}px]`}
        />
        <h1 className="text-2xl font-bold mb-0">Stock & Price Controller Service</h1>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-4">
        <div className="bg-white dark:bg-muted/50 aspect-video rounded-xl shadow-sm border border-gray-200 dark:border-0" />
        <div className="bg-white dark:bg-muted/50 aspect-video rounded-xl shadow-sm border border-gray-200 dark:border-0" />
        <div className="bg-white dark:bg-muted/50 aspect-video rounded-xl shadow-sm border border-gray-200 dark:border-0" />
        <div className="bg-white dark:bg-muted/50 aspect-video rounded-xl shadow-sm border border-gray-200 dark:border-0" />
      </div>
      <div className="bg-white dark:bg-muted/50 shadow-sm border border-gray-200 dark:border-0 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
    </div>
  );
}
