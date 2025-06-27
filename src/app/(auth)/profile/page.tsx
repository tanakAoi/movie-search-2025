import { Container } from "@/app/(public)/components/layout/Container";
import AuthButton from "../components/ui/AuthButton";

export default function ProfilePage() {
  return (
    <div className="flex flex-col items-center h-screen">
      <Container>
        <AuthButton />
      </Container>
    </div>
  );
}
