// app/resume/edit/[id]/page.tsx
import EditResumeClient from "./EditResumeClient";


export async function generateStaticParams() {
  // Example: return all the possible `id` values
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
  ];
}

export default function EditResumePage({ params }: any) {
  // Directly use the `params` object
  return <EditResumeClient id={params.id} />;
}
