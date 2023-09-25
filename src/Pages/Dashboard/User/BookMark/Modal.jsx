import React from 'react';

const Modal = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upaZila, setUpaZila] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistricts, setSelectedDistricts] = useState("");
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredUpaZila, setFilteredUpaZila] = useState([]);
  useEffect(() => {
    // Assuming the fetch methods are similar to your previous example
    fetch("/division.json")
      .then((res) => res.json())
      .then((data) => setDivisions(data.divisions));

    fetch("/districts.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data.districts));

    fetch("/upzilahs.json")
      .then((res) => res.json())
      .then((data) => setUpaZila(data.upazilas));
  }, []);
  useEffect(() => {
    if (selectedDivision) {
      const relevantDistricts = districts.filter(
        (district) => district.division_id === selectedDivision
      );
      setFilteredDistricts(relevantDistricts);
    }
  }, [selectedDivision, districts]);

  useEffect(() => {
    if (selectedDistricts) {
      const relevantUpZila = upaZila.filter(
        (upaZilaes) => upaZilaes.district_id === selectedDistricts
      );
      setFilteredUpaZila(relevantUpZila);
    }
  }, [selectedDistricts, upaZila]);
  const send = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const divisionId = e.target.division.value;
    const divisionData = divisions.find((di) => di.id === divisionId);
    const division = divisionData.name;
    const districtId = e.target.district.value;
    const districtData = districts.find((di) => di.id === districtId);
    const district = districtData.name;
    const upZilaId = e.target.upZila.value;
    const upZilaData = upaZila.find((up) => up.id === upZilaId);
    const upZila = upZilaData.name;
    const postCode = e.target.postCode.value;
    const number = e.target.number.value;
    const currency = e.target.currency.value;
    const classId = selectedClass._id;
    const data = {
      name,
      email,
      division,
      district,
      upZila,
      postCode,
      number,
      currency,
      classId,
    };

    console.log(data);
  };
    return (
        <div>
            <div className="fixed top-0 text-black left-0 w-full bottom-0 z-50 h-full flex items-center justify-center ">
                      <div className="mx-16">
                        <section className="relative py-10  sm:py-16 lg:py-24">
                          <div className="relative lg:w-[1000px] w-[350px] px-4 mx-auto sm:px-0">
                            <div className="overflow-hidden bg-white rounded-md shadow-md">
                              <div className="px-4 py-6 sm:px-8 sm:py-7">
                                <div className="text-center flex items-center justify-between">
                                  <h2 className="text-3xl font-bold text-gray-900">
                                    Check Out Page...
                                  </h2>
                                  <button onClick={() => setShowModal(false)}>
                                    <FaArrowRightFromBracket size={25} />
                                  </button>
                                </div>

                                <form onSubmit={send} className="mt-5">
                                  <div className="space-y-2 ">
                                    <div className="flex space-x-5">
                                      <div>
                                        <label
                                          for=""
                                          className="text-base font-medium text-gray-900"
                                        >
                                          {" "}
                                          Name
                                        </label>
                                        <div className="mt-2">
                                          <input
                                            type="text"
                                            name="name"
                                            id=""
                                            readOnly
                                            defaultValue={user?.displayName}
                                            {...register("name", {
                                              required: true,
                                            })}
                                            placeholder="Enter your full name"
                                            className="block w-full px-3 py-2 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                          />
                                        </div>
                                      </div>

                                      <div>
                                        <label
                                          for=""
                                          className="text-base font-medium text-gray-900"
                                        >
                                          {" "}
                                          Email address{" "}
                                        </label>
                                        <div className="mt-2">
                                          <input
                                            type="email"
                                            name="email"
                                            id=""
                                            {...register("email", {
                                              required: true,
                                            })}
                                            readOnly
                                            defaultValue={user?.email}
                                            placeholder="Enter email to get started"
                                            className="block w-full px-3 py-2 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
                                          />
                                        </div>
                                      </div>
                                    </div>

                                    {/* Address Star */}
                                    <div class="space-x-5 space-y-2 flex w-full items-center">
                                      <div className="w-full px-4">
                                        <label className="mb-3 block text-base font-medium text-black">
                                          Division
                                        </label>
                                        <div className="relative z-20 bg-white">
                                          <select
                                            name="division"
                                            required
                                            className="block w-full px-3 py-2 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-cyan-600 caret-cyan-600"
                                            onChange={(e) =>
                                              setSelectedDivision(
                                                e.target.value
                                              )
                                            }
                                          >
                                            <option value="">
                                              Select a Division
                                            </option>
                                            {divisions.map((i) => (
                                              <option key={i.id} value={i.id}>
                                                {i.name}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      </div>
                                      {/*  */}
                                      <div className="w-full px-4">
                                        <label className="mb-3 block text-base font-medium text-black">
                                          District
                                        </label>
                                        <div className="relative z-20 bg-white">
                                          <select
                                            name="district"
                                            required
                                            onChange={(e) =>
                                              setSelectedDistricts(
                                                e.target.value
                                              )
                                            }
                                            className="block w-full px-3 py-2 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-cyan-600 caret-cyan-600"
                                          >
                                            <option value="">
                                              Select a District
                                            </option>
                                            {filteredDistricts.map((i) => (
                                              <option key={i.id} value={i.id}>
                                                {i.name}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      </div>

                                      {/* upa */}
                                      <div className="w-full px-4">
                                        <label className="mb-3 block text-base font-medium text-black">
                                          Up Zila
                                        </label>
                                        <div className="relative z-20 bg-white">
                                          <select
                                            name="upZila"
                                            required
                                            className="block w-full px-3 py-2 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-cyan-600 caret-cyan-600"
                                          >
                                            <option value="">
                                              Select a Up Zila
                                            </option>

                                            {filteredUpaZila.map((i) => (
                                              <option key={i.id} value={i.id}>
                                                {i.name}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                    {/* Address End */}

                                    <div className="flex gap-9 items-center justify-center">
                                      <div className="w-1/3">
                                        <label
                                          for=""
                                          className="text-base font-medium text-gray-900"
                                        >
                                          {" "}
                                          Post Code
                                        </label>
                                        <div className="mt-2">
                                          <input
                                            type="number"
                                            name="postCode"
                                            required
                                            placeholder="Your Post Code Here"
                                            className="block w-full px-3 py-2 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-cyan-600 caret-cyan-600"
                                          />
                                        </div>
                                      </div>
                                      <div className="w-full">
                                        <label
                                          for=""
                                          className="text-base font-medium text-gray-900"
                                        >
                                          {" "}
                                          Phone Number
                                        </label>
                                        <div className="mt-2">
                                          <input
                                            type="number"
                                            name="number"
                                            required
                                            placeholder="Your Phone Number given"
                                            className="block w-full px-3 py-2 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-cyan-600 caret-cyan-600"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    {/*  */}
                                    <div className="-mx-4 flex flex-wrap">
                                      <div className="w-full px-4 ">
                                        <div className="">
                                          <label className="mb-3 block text-base font-medium text-black">
                                            Currency
                                          </label>
                                          <div className="relative z-20  bg-white">
                                            <span className="absolute top-1/2 left-4 -translate-y-1/2">
                                              <svg
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <g opacity="0.8">
                                                  <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M10.0007 2.50065C5.85852 2.50065 2.50065 5.85852 2.50065 10.0007C2.50065 14.1428 5.85852 17.5007 10.0007 17.5007C14.1428 17.5007 17.5007 14.1428 17.5007 10.0007C17.5007 5.85852 14.1428 2.50065 10.0007 2.50065ZM0.833984 10.0007C0.833984 4.93804 4.93804 0.833984 10.0007 0.833984C15.0633 0.833984 19.1673 4.93804 19.1673 10.0007C19.1673 15.0633 15.0633 19.1673 10.0007 19.1673C4.93804 19.1673 0.833984 15.0633 0.833984 10.0007Z"
                                                    fill="#637381"
                                                  ></path>
                                                  <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M0.833984 9.99935C0.833984 9.53911 1.20708 9.16602 1.66732 9.16602H18.334C18.7942 9.16602 19.1673 9.53911 19.1673 9.99935C19.1673 10.4596 18.7942 10.8327 18.334 10.8327H1.66732C1.20708 10.8327 0.833984 10.4596 0.833984 9.99935Z"
                                                    fill="#637381"
                                                  ></path>
                                                  <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M7.50084 10.0008C7.55796 12.5632 8.4392 15.0301 10.0006 17.0418C11.5621 15.0301 12.4433 12.5632 12.5005 10.0008C12.4433 7.43845 11.5621 4.97153 10.0007 2.95982C8.4392 4.97153 7.55796 7.43845 7.50084 10.0008ZM10.0007 1.66749L9.38536 1.10547C7.16473 3.53658 5.90275 6.69153 5.83417 9.98346C5.83392 9.99503 5.83392 10.0066 5.83417 10.0182C5.90275 13.3101 7.16473 16.4651 9.38536 18.8962C9.54325 19.069 9.76655 19.1675 10.0007 19.1675C10.2348 19.1675 10.4581 19.069 10.6159 18.8962C12.8366 16.4651 14.0986 13.3101 14.1671 10.0182C14.1674 10.0066 14.1674 9.99503 14.1671 9.98346C14.0986 6.69153 12.8366 3.53658 10.6159 1.10547L10.0007 1.66749Z"
                                                    fill="#637381"
                                                  ></path>
                                                </g>
                                              </svg>
                                            </span>
                                            <select
                                              name="currency"
                                              required
                                              className="relative z-20 w-full appearance-none rounded-md border border-form-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary text-black disabled:cursor-default disabled:bg-[#F5F7FD]"
                                            >
                                              <option value="BDT">BDT</option>
                                              <option value="INR">INR</option>
                                              <option value="USD">USD</option>
                                              <option value="EUR">EUR</option>
                                            </select>
                                            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                                              <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                              >
                                                <g opacity="0.8">
                                                  <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                    fill="#637381"
                                                  ></path>
                                                </g>
                                              </svg>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    {/*  */}
                                    <div>
                                      <button className="inline-flex items-center justify-center w-full px-4 py-2 text-base font-semibold text-white transition-all duration-200 bg-cyan-600 border border-transparent rounded-md focus:outline-none hover:bg-cyan-700 focus:bg-cyan-700">
                                        Send
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    </div>
        </div>
    );
};

export default Modal;