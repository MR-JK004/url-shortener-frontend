import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'
function useLogout() {
    let navigate = useNavigate()
    
  return ()=>{
    toast.info("Logout Successfull")
    sessionStorage.clear()
    navigate('/login')
  }
}

export default useLogout