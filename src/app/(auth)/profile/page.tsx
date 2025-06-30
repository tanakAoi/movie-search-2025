import { Container } from "@/app/(public)/components/layout/Container";
import AuthButton from "../components/ui/AuthButton";

export default function ProfilePage() {
  return (
    <Container className="flex flex-col items-center h-screen">
      <AuthButton />
    </Container>
  );
}
