import Link from 'next/link';
import Image from 'next/image';

export const PostCard = ({
  title,
  description,
  url,
  image,
  date,
}: {
  title: string;
  description: string;
  image?: string | null;
  url: string;
  date: string;
}) => {
  return (
    <Link
      href={url}
      className='px-6 py-6 bg-card/50 hover:bg-card/80 transition-colors flex justify-between flex-wrap gap-2 max-w-full overflow-hidden'
    >
      <div className='max-w-full flex flex-col gap-3 h-full'>
        <div className='flex-1'>
          <h2 className='mt-2 text-xl font-medium'>{title}</h2>
          <p className='overflow-hidden text-ellipsis whitespace-nowrap text-medium text-fd-muted-foreground'>
            {description}
          </p>
        </div>
        <p className='font-medium'>{date}</p>
      </div>
      <div>
        {image ? (
          <Image
            src={image}
            alt={title}
            width={250}
            height={250}
            className='rounded-lg'
          />
        ) : null}
      </div>
    </Link>
  );
};
