import { Player } from "@lottiefiles/react-lottie-player";

export function RobotLoader() {
  return (
    <div className="w-full sm:w-2/3">
      <Player
        autoplay
        loop
        src="/robot-loading-animation.json"
        style={{ height: "100%", width: "100%" }}
      ></Player>
    </div>
  );
}
