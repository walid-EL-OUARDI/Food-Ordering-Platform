import { useAppSelector } from "@/app/hooks/hooks";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, { UserFormData } from "./forms/UserProfileForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import YcpayForm from "./forms/youcanpayform/YcpayForm";
type Props = {
  disabled: boolean;
  isLoading: boolean;
  onSave: (userFormData: UserFormData) => void;
  onPay: () => void;
};

const CheckoutButton = ({ disabled, onSave, onPay, isLoading }: Props) => {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <Button
        onClick={() => navigate("/login")}
        className="bg-orange-500 flex-1"
      >
        Log in to check out
      </Button>
    );
  }
  if (isAuthenticated) {
    return (
      <Dialog>
        <DialogTrigger>
          <Button
            disabled={disabled}
            className="bg-orange-500 flex-1"
          >
            Go to checkout
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Tabs
            defaultValue="user-profile"
            className="w-[400px]"
          >
            <TabsContent value="user-profile">
              <UserProfileForm
                onSave={onSave}
                isLoading={isLoading}
                title="Confirm Deliery Details"
              />
              <TabsList className="mt-3 bg-orange-500 hover:bg-slate-900">
                <TabsTrigger value="payment-getway">
                  <Button
                    type="submit"
                    className="bg-orange-500"
                  >
                    Pay now
                  </Button>
                </TabsTrigger>
              </TabsList>
            </TabsContent>
            <TabsContent value="payment-getway">
              <YcpayForm onPay={onPay} />
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  }
};

export default CheckoutButton;
