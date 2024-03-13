import router from '@/router'
// fonction de sécurité d'accès aux pages
// si j'ai mon token, tu peux aller aux pages de l'admin sinon retourne à login
export function authGuard(to){
    let token = localStorage.getItem('token')

    if(token){
        return true
    }

    router.push('/login')
}