import Link from 'next/link';
import { useRouter } from 'next/router';
import photoshootsData from '../../public/photoshoots.json';

const Header = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const defaultCollectionId = photoshootsData[0]?.id;

  return (
    <div className="pt-4 pl-4 mb-2 lg:pt-8 lg:pl-8 lg:absolute left-0 top-0 lg:h-full lg:text-right">
      <header>
        <nav>
          <ul className="space-y-1">
            {/* About Link */}
            <li>
              <Link href="/about" className="text-xl font-nohemi-regular font-bold-about">
                About
              </Link>
            </li>

            {/* Collection Names */}
            {photoshootsData.map((photoshoot) => (
              <li key={photoshoot.id}>
                <Link
                  href={`/photography/${photoshoot.id}`}
                  className={`text-lg ${
                    id === photoshoot.id || (!id && photoshoot.id === defaultCollectionId)
                      ? 'font-nohemi-medium'
                      : 'font-nohemi-light'
                  }`}
                >
                  {photoshoot.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
