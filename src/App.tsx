import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Provider } from "react-redux";
import store from "./redux/store";
import Admin from "./routes/admin/Admin";


export default function App() {
  const token = localStorage.getItem("admtoken");
  console.log(token);
  
  return <>
    <Provider store={store}>
      <Routes>
        {/* <Route  path="/*" element={<Users/>} /> */}
        <Route path="/admin/*" element={<Admin />} />
        {
          token ? (
            <Route path='/' element={<Navigate to='/admin/dashboard' />} />
          ) : (
            <Route path='/' element={<Navigate to='/admin/login' />} />
          )
        }
      </Routes>
      <Toaster />
    </Provider>
  </>;
}
