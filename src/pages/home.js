import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";

import Product from "../components/Product";
import NavBar from "../components/NavBar";

import adidas from "../../public/adidas.PNG";
import cafetera from "../../public/cafetera.PNG";
import pcgamer from "../../public/pcgamer.PNG";
import xbox from "../../public/xboc.PNG";
import MyLoader from "../components/MyLoader";

const home = () => {
  const authUser = useAuthUser();
  return (
    <>
      <div className="bg-light">
        <NavBar />
        <div>
          {/* productos */}
          <div className="grid grid-cols-1 justify-items-center tablet:grid-cols-2 desktop:grid-cols-3 wide:grid-cols-4 ">
            <Product
              title="Shoes!"
              img={adidas}
              desciption="If a dog chews shoes whose shoes does he choose?"
              price={16000}
            />
            <Product
              title="Coffe Machine"
              img={cafetera}
              desciption="Excellent single group coffee machine with pressure above 1.5 bars."
              price={250000}
            />
            <Product
              title="Xbox X"
              img={xbox}
              desciption="Xbox X series video game console, 4K video, 1TB storage and joystick."
              price={160000}
            />
            <Product
              title="Notebook Gamer Nitro"
              img={pcgamer}
              desciption="Processor I5, Ram16gb, SSD 256gb + 1tb (HHD) videp board Gtx 1650, operating system W11.s"
              price={260000}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export const getServerSideProps = withAuthUserTokenSSR({})(() => {
  return { props: {} };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: MyLoader,
})(home);
