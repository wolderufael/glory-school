// import { getCurrentUser } from '@/lib/auth/getCurrentUser';
// import { UserType } from '@/utils/typeUser';
// import { redirect } from 'next/navigation';


// export default async function StudentLayout({ children }: { children: React.ReactNode }) {
//   const user = await getCurrentUser();

//   if (!user || user.role !== UserType.Registrar) {
//     return redirect('/unauthorized');
//   }

//   return (<div>{children}</div>);
// }
