const CoinTossAnimation = ({
  videoRef,
  videoSource,
}: {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoSource: string;
}) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <video
        ref={videoRef}
        style={{ objectPosition: '50% 80%' }}
        className="h-full w-full object-cover"
        muted
      >
        <source src={videoSource} type="video/mp4" />
      </video>
    </div>
  );
};

export default CoinTossAnimation;
