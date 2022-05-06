import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex h-screen bg-slate-200">
      <div className="m-auto justify-center items-center ">
        <div className="bg-slate-400 rounded-xl">
          <p className="p-2 pr-6 pl-6">
            One day, this text will go into the history books. Screenshot this!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
