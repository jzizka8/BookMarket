const Footer = () => {
  return (
    <footer className="mt-auto w-full bg-primary-main p-4 text-center text-zinc-200">
      <p className="my-2 text-2xl font-semibold italic">
        {' '}
        Re-Tale: Where stories find new beginnings
      </p>
      <p className="text-md">
        This Website was made with great passion (and tears). &copy;
        {new Date().getFullYear()}
      </p>
    </footer>
  );
};
export default Footer;
