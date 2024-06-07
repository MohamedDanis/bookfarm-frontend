import { Home, } from 'lucide-react';

import { Link,useLocation } from 'react-router-dom';


const Breadcrumb = ({terminalPath}:any) => {
  
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter(x => x);
  
  console.log(pathnames);
  
  return (
    <div className='flex items-center m-6'>
      <Link to="/">
        <Home size={20} /> {/* Use the home icon */}
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`; 
        const isLast = index === pathnames.length - 1;
        return isLast ? (  
          <div key={name}>/{terminalPath}</div> 
        ) : (
          <Link key={name} to={routeTo}>/{name}</Link>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
