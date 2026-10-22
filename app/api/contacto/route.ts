import { getDb } from "@/db";
import { contactRequests } from "@/db/schema";
export async function POST(request:Request){
 const json=(error:string,status=400)=>Response.json({error},{status});
 const origin=request.headers.get("origin");if(origin&&origin!==new URL(request.url).origin)return json("Origen no permitido.",403);
 if(!request.headers.get("content-type")?.includes("application/json"))return json("Formato no válido.",415);
 try{const raw=await request.text();if(raw.length>6000)return json("La solicitud es demasiado larga.",413);const body=JSON.parse(raw);if(!body||typeof body!=="object"||body.website)return json("No se pudo registrar la solicitud.");const field=(key:string)=>typeof body[key]==="string"?body[key].trim():"";
 const name=field("name"),method=field("method"),contact=field("contact"),preferredDate=field("preferredDate"),timeWindow=field("timeWindow"),interest=field("interest"),message=field("message");
 if(name.length<2||name.length>80||interest.length<1||interest.length>120||message.length>1000||body.consent!=="on")return json("Revisa tu nombre, interés y autorización de contacto.");
 if(!["whatsapp","phone","email"].includes(method))return json("Selecciona un medio de contacto.");
 if(contact.length>160||(method==="email"?!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact):(!/^[+\d ()-]{7,24}$/.test(contact)||contact.replace(/\D/g,"").length<7)))return json("Ingresa un correo o teléfono válido.");
 const today=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Lima",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());const date=new Date(preferredDate+"T12:00:00Z");
 if(!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate)||!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==preferredDate||preferredDate<today)return json("Elige una fecha válida a partir de hoy.");
 if(!["09:00-12:00","12:00-15:00","15:00-18:00","18:00-21:00"].includes(timeWindow))return json("Selecciona un horario válido.");if(date.getUTCDay()===0&&timeWindow!=="09:00-12:00")return json("Los domingos elige el horario de 9 a. m. a 12 p. m.");
 const now=new Date().toISOString(),id=crypto.randomUUID();await getDb().insert(contactRequests).values({id,name,method,contact,preferredDate,timeWindow,interest,message,consentAt:now,createdAt:now});return Response.json({ok:true,id},{status:201});
 }catch(error){if(error instanceof SyntaxError)return json("La solicitud no es válida.");console.error("Contact request could not be stored");return json("No pudimos guardar tu solicitud. Intenta nuevamente o escríbenos por WhatsApp.",503)}
}
