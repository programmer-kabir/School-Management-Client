import React, { useEffect, useState } from "react";

const Payment = () => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upaZila, setUpaZila] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistricts, setSelectedDistricts] = useState("");
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [filteredUpaZila, setFilteredUpaZila] = useState([]);
  // Fetch divisions
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

  return (
    <div className="pt-20 mx-16">
      <section class="relative py-10 bg-gray-900 sm:py-16 lg:py-24">
        <div class="absolute inset-0">
          <img
            class="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1596003906949-67221c37965c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZ3JhbW1lcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
            alt=""
          />
        </div>
        <div class="absolute inset-0 bg-gray-900/20"></div>

        <div class="relative max-w-lg px-4 mx-auto sm:px-0">
          <div class="overflow-hidden bg-white rounded-md shadow-md">
            <div class="px-4 py-6 sm:px-8 sm:py-7">
              <div class="text-center">
                <h2 class="text-3xl font-bold text-gray-900">
                  Check Out Page...
                </h2>
              </div>

              <form action="#" method="POST" class="mt-8">
                <div class="space-y-5">
                  <div className="w-full px-4">
                    <label className="mb-3 block text-base font-medium text-black">
                      Division
                    </label>
                    <div className="relative z-20 bg-white">
                      <select
                        className="relative z-20 w-full appearance-none rounded-md border"
                        onChange={(e) => setSelectedDivision(e.target.value)}
                      >
                        <option value="">Select a Division</option>
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
                      Up Zila
                    </label>
                    <div className="relative z-20 bg-white">
                      <select
                        onChange={(e) => setSelectedDistricts(e.target.value)}
                        className="relative z-20 w-full appearance-none rounded-md border"
                      >
                        <option value="">Select a District</option>
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
                      District
                    </label>
                    <div className="relative z-20 bg-white">
                      <select className="relative z-20 w-full appearance-none rounded-md border">
                        <option value="">Select a District</option>
                        {filteredUpaZila.map((i) => (
                          <option key={i.id} value={i.id}>
                            {i.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </form>

              <p class="max-w-xs mx-auto mt-5 text-sm text-center text-gray-600">
                This site is protected by reCAPTCHA and the Google{" "}
                <a
                  href="#"
                  title=""
                  class="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
                >
                  Privacy Policy
                </a>{" "}
                &
                <a
                  href="#"
                  title=""
                  class="text-blue-600 transition-all duration-200 hover:underline hover:text-blue-700"
                >
                  Terms of Service
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payment;
