import { useSelector } from "react-redux";

import { selectUser } from "../feature/user/userSlice";

import Footer from "../components/Footer";
import NavBarProfile from "../components/NavBarProfile";
import MyLoader from "../components/MyLoader";
import { AuthAction, withAuthUser } from "next-firebase-auth";

function Profile() {
  const user = useSelector(selectUser)
  console.log(user)
  return (
    <>
      <NavBarProfile />
      <div className="z-0 py-10 grid grid-cols-2 justify-items-center w-full bg-light min-h-screen">
        {/* AVATAR */}
        <div className="grid-cols-1 w-11/12 self-start">
          <div className=" rounded-3xl">
            <div className="mask desktop:mx-auto desktop:w-48 m-10 w-28 mask-squircle">
              <img
                src="https://us.123rf.com/450wm/tuktukdesign/tuktukdesign1606/tuktukdesign160600119/59070200-icono-de-usuario-hombre-perfil-hombre-de-negocios-avatar-icono-persona-en-la-ilustraci%C3%B3n-vectorial.jpg?ver=6"
                alt="Avatar Profile"
              />
            </div>
          </div>

          {/* CARD  */}
          <div className="card card-compact w-full h-full m-auto text-light bg-dark shadow-xl">
            <div className="card-body ">
              <h2 className="card-title desktop:text-2xl">
                Banking information
              </h2>
              <div className="divider m-0" />
              <div className=" justify-start form-control">
                <label className="label">
                  <span className="text-light desktop:text-xl label-text">
                    Account holder
                  </span>
                </label>
                <label className="label">
                  <input
                    type="text"
                    placeholder="Ramiro Gabriel Gumma"
                    className="input w-full input-xs desktop:input-md input-bordered"
                  />
                </label>
                <span className="text-light desktop:text-xl mt-2 label-text">
                  C.B.U
                </span>
                <label className="label">
                  <input
                    type="text"
                    placeholder=""
                    className="input w-full input-xs desktop:input-md input-bordered"
                  />
                </label>
                <span className="text-light desktop:text-xl mt-2 label-text">
                  CUIT/CUIL
                </span>
                <label className="label">
                  <input
                    type="text"
                    placeholder=""
                    className="input w-full input-xs desktop:input-md input-bordered"
                  />
                </label>
              </div>
            </div>
            <div className="card-actions">
              <button className="btn m-2 w-11/12 btn-primary desktop:mx-auto desktop:my-5">
                SAVE
              </button>
            </div>
          </div>
        </div>

        {/* CARD INFOR */}
        <div className="z-0 card card-compact m-5 w-11/12 text-light bg-dark shadow-xl desktop:h-11/12 h-11/12 self-start">
          <div className="card-body z-0">
            <h2 className="text-sm desktop:text-2xl font-medium">E-mail:</h2>
            <span className="text-xs desktop:text-xl">{user.email}</span>
            <div className="divider m-0" />
            <form className="">
              <label className="desktop:text-xl">Name: </label>
              <input
                className="input input-xs  desktop:input-md input-bordered input-primary w-full max-w-xs desktop:my-5 desktop:ml-5"
                type="text"
                placeholder="Ramiro"
              />
              <br />
              <label className="desktop:text-xl">Surname: </label>
              <input
                className="input input-xs  desktop:input-md input-bordered input-primary w-full max-w-xs desktop:my-5 desktop:ml-5"
                type="text"
                placeholder="Gumma"
              />
            </form>
            <div className="divider m-0" />
            {/* DNI */}
            <div className="form-control w-11/12">
              <label className="input-group desktop:input-group-lg input-group-xs">
                <span>DNI</span>
                <input
                  type="text"
                  placeholder="42.282.613"
                  className="input w-full max-w-xs input-primary input-bordered desktop:input-md input-xs"
                />
              </label>
              {/* Genero */}
              <label className="input-group my-5 desktop:mx-0 mx-auto w-full max-w-xs  ">
                <span>Gender</span>
                <select className="select input-xs desktop:input-md desktop:w-11/12 input-primary select-bordered  ">
                  <option disabled selected>
                    Pick category
                  </option>
                  <option>Man</option>
                  <option>Woman</option>
                  <option>Other</option>
                </select>
              </label>
              {/* CUMPLEAÑOS */}
              <label className="input-group desktop:input-group-lg input-group-xs">
                <span>Birthday</span>
                <input
                  type="date"
                  className="input w-full max-w-xs input-primary input-bordered desktop:input-md input-xs"
                />
              </label>
            </div>
          </div>
          <div className="card-actions">
            <button className="btn m-2 w-11/12 btn-primary desktop:mx-auto desktop:my-5">
              SAVE
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  LoaderComponent: MyLoader,
})(Profile);
