import { useNavigate } from "react-router-dom";
function PublicLayout(props:any) {
    const router = useNavigate();
    const token =localStorage.getItem('admtoken')
       
        if (token) {
          router('/admin/dashboard');
          return null;
        }
    return props.children
}

export default PublicLayout;