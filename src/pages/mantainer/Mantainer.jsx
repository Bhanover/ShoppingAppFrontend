const MantainerScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen px-4 ">
      <div className="text-center custom-500:mt-20">
        <h1 className="text-red-900 font-black text-mega ">
          503 Service
          <br /> Unavailable
        </h1>
        <img
          src="/static/mantainer/Personamantenimiento.svg"
          alt="Persona de Mantenimiento"
          className="w-full md:w-80 mx-auto sm:w-72 custom-350:w-64"
        />
      </div>
    </div>
  );
};

export default MantainerScreen;
