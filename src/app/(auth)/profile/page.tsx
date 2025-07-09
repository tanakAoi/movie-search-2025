import { Container } from "@/app/(public)/components/layout/Container";
import AuthGate from "../components/auth/AuthGate";

export default function ProfilePage() {
  
  return (
    <Container className="flex flex-col items-center">
      <AuthGate />
    </Container>
  );
}
