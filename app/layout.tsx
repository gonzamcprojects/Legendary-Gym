import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:{default:'Legendary Gym · Atrévete al cambio',template:'%s | Legendary Gym'},description:'Tu siguiente versión empieza en Legendary Gym, Los Olivos. Planes, musculación, cardio, clases grupales y entrenamiento funcional.',icons:{icon:'/logo.jpg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es-PE"><body>{children}</body></html>}
