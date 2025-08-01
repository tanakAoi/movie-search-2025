import { Container } from "@/app/components/layout/Container";
import AuthGate from "../components/auth/AuthGate";
import StarryBackground from "@/app/components/decor/StarryBackground";

export default function ProfilePage() {
  return (
    <div className="min-h-screen h-full relative">
      <StarryBackground />
      <Container className="flex flex-col items-center">
        <AuthGate />
      </Container>
    </div>
  );
}
