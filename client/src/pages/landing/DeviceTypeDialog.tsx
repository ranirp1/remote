import { CheckRequest, DeviceClassification } from "./CheckNow";
import { RxCross2 } from "react-icons/rx";
import RecycleImage from "../../assets/device_type_recycle.svg";
import RareImage from "../../assets/devices.svg";
import recycleAnimation from "../../animation/recycle.json";
import sellingAnimation from "../../animation/sell.json";
import QRCode from "react-qr-code";
import Lottie from "lottie-react";

const DeviceTypeDialog = ({
  deviceType,
  request,
}: {
  deviceType?: DeviceClassification;
  request: CheckRequest;
}) => {
  const createCexSearchUrl = (
    manufacturer: string,
    model: string,
    storage: string,
    color: string
  ) => {
    const baseUrl = "https://uk.webuy.com/search";
    const queryParts = [manufacturer, model, storage, color].filter(
      (part) => part
    ); // Filters out null or empty strings
    const query = queryParts.join(" "); // Joins the parts into a single string with spaces
    return `${baseUrl}?stext=${encodeURIComponent(query)}`;
  };

  const isDeviceRecyclable = deviceType === DeviceClassification.Recycle;
  const isDeviceRareOrCurrent =
    deviceType === DeviceClassification.Rare ||
    deviceType === DeviceClassification.Current;

  const getTitle = () => {
    if (deviceType === DeviceClassification.Recycle) {
      return "Recyclable!";
    } else if (deviceType === DeviceClassification.Rare) {
      return "Rare Device!";
    } else {
      return "Current";
    }
  };

  const getDescription = () => {
    if (deviceType === DeviceClassification.Recycle) {
      return (
        <div className="bg-yellow-100 rounded my-3 p-5 text-black text-lg ">
          Reduce, Reuse, Recycle! Your device is recyclable. Simply login or
          register to access valuable data derived from it. Let's contribute to
          a sustainable future together!
        </div>
      );
    } else {
      return (
        <div className="bg-yellow-100 rounded my-3 p-5 text-black text-lg w-full">
          Your device belongs to the {deviceType} type. Please check the link
          below or scan the QR code to get more information about your device,
          which will make it easier to sell.
        </div>
      );
    }
  };

  return (
    <div className="modal-box modal-middle p-10 bg-gray-100">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn  btn-primary btn-circle  absolute right-2 top-2">
          <RxCross2 size={20} />
        </button>
      </form>
      <div className="flex flex-col mt-10">
        <div className="flex flex-row w-full place-content-center">
          <div className="text-5xl font-bold text-primary text-opacity-50 mr-3">
            Device Type
          </div>
          <h1 className=" text-5xl font-bold text-primary ">{getTitle()}</h1>
        </div>
        <div className=" flex flex-row items-center">
          <div
            className={`flex flex-1  place-content-center ${
              isDeviceRecyclable ? "w-96 h-96" : ""
            }`}
          >
            <Lottie
              animationData={
                isDeviceRecyclable ? recycleAnimation : sellingAnimation
              }
              loop={true}
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {isDeviceRareOrCurrent && (
            <div className="flex flex-1  place-content-center">
              <QRCode
                value={request.brand + "\n" + request.model}
                className="w-1/2"
              />
            </div>
          )}
        </div>
        {getDescription()}
        <div className="flex flex-1 place-content-center flex-col my-4">
          <div className="flex flex-row ">
            <button
              className="btn btn-primary w-1/2 "
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              Login
            </button>
            <button
              className="btn btn-ghost bg-white w-1/2 "
              onClick={() => {
                window.location.href = "/register";
              }}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceTypeDialog;
