const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav className="flex flex-wrap justify-center">
          {navigation.map((item: { title: string; url: string }, i: number) => (
            <div key={i} className="px-6 py-2">
              <a href={item.url} className="text-gray-500 hover:text-gray-900">
                {item.title}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-8 text-center text-gray-400">&copy; 2022 BlackBuck Studio.</p>
      </div>
    </footer>
  )
}

const navigation = [
  {
    title: 'Home',
    url: '/',
  },
  {
    title: 'About',
    url: '/about',
  },
  {
    title: 'Contact',
    url: '/contact',
  },
]

export default Footer
