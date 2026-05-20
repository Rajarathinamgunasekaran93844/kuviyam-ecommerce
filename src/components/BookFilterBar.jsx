import { useState } from "react";

import {
  Home,
  ChevronDown,
} from "lucide-react";

const BookFilterBar = () => {
  const [openMenu, setOpenMenu] =
    useState(null);

  const menuItems = [
    {
      label: "All Books",
      dropdown: true,
    },

    {
      label: "Children Books",
      dropdown: true,
    },

    {
      label: "Offer Zone",
    },

    {
      label: "Collections",
    },

    {
      label: "Categories",
      dropdown: true,
    },

    {
      label: "Subjects",
      dropdown: true,
    },

    {
      label: "Book Reviews",
    },
  ];

  const handleMouseEnter = (
    menu
  ) => {
    clearTimeout(window.menuTimeout);

    setOpenMenu(menu);
  };

  const handleMouseLeave = () => {
    window.menuTimeout =
      setTimeout(() => {
        setOpenMenu(null);
      }, 250);
  };

  return (
    <div
      className="
        relative

        w-full

        bg-white/95
        backdrop-blur-md

        border-y border-orange-100

        shadow-md

        z-40
      "
    >
      {/* ====================================== */}
      {/* FILTER BAR */}
      {/* ====================================== */}

      <div
        className="
          max-w-[1500px]

          mx-auto

          flex items-center

          overflow-x-auto
          overflow-y-hidden

          scrollbar-thin
          scrollbar-thumb-orange-400
          scrollbar-track-orange-50

          relative
        "
      >
        {/* HOME */}

        <button
          className="
            h-[72px]
            min-w-[72px]

            bg-gradient-to-b
            from-orange-500
            to-orange-600

            text-white

            flex items-center justify-center

            shadow-md

            hover:scale-105

            transition duration-300
          "
        >
          <Home size={26} />
        </button>

        {/* MENUS */}

        <div
          className="
            flex items-center

            min-w-max
          "
        >
          {menuItems.map((item, index) => (
            <div
              key={index}

              onMouseEnter={() =>
                handleMouseEnter(
                  item.label
                )
              }

              onMouseLeave={
                handleMouseLeave
              }
            >
              <button
                className={`
                  h-[72px]

                  px-7 xl:px-8

                  flex items-center justify-center gap-2

                  text-[17px]
                  xl:text-[19px]

                  font-semibold

                  whitespace-nowrap

                  border-r border-orange-100

                  transition duration-300

                  ${
                    openMenu === item.label
                      ? "bg-orange-500 text-white"
                      : "text-gray-800 hover:bg-orange-50 hover:text-orange-500"
                  }
                `}
              >
                {item.label}

                {item.dropdown && (
                  <ChevronDown
                    size={20}
                    className={`
                      transition duration-300

                      ${
                        openMenu === item.label
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ====================================== */}
      {/* ALL BOOKS */}
      {/* ====================================== */}

      {openMenu ===
        "All Books" && (
        <div
          onMouseEnter={() =>
            handleMouseEnter(
              "All Books"
            )
          }

          onMouseLeave={
            handleMouseLeave
          }

          className="
            fixed

            left-1/2
            top-[145px]

            -translate-x-1/2

            w-[95vw]
            xl:w-[1180px]

            max-w-[95vw]

            bg-white/95
            backdrop-blur-xl

            border border-white/70

            shadow-[0_25px_60px_rgba(0,0,0,0.18)]

            rounded-[32px]

            ring-1 ring-orange-100

            p-5 md:p-6 xl:p-8

            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-4

            gap-10

            animate-in
            fade-in
            zoom-in-95
            duration-200

            z-[9999]
          "
        >
          <div>
            <h3 className="font-black text-2xl mb-6">
              All Books
            </h3>

            <ul className="space-y-4 text-lg text-gray-700">
              <li className="hover:text-orange-500 cursor-pointer">
                Children Books
              </li>

              <li className="hover:text-orange-500 cursor-pointer">
                Bestsellers
              </li>

              <li className="hover:text-orange-500 cursor-pointer">
                New Releases
              </li>

              <li className="hover:text-orange-500 cursor-pointer">
                Tamil Books
              </li>

              <li className="hover:text-orange-500 cursor-pointer">
                English Books
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-2xl mb-6">
              Categories
            </h3>

            <ul className="space-y-4 text-lg text-gray-700">
              <li className="hover:text-orange-500 cursor-pointer">
                Novel
              </li>

              <li className="hover:text-orange-500 cursor-pointer">
                Translation
              </li>

              <li className="hover:text-orange-500 cursor-pointer">
                Travelogue
              </li>

              <li className="hover:text-orange-500 cursor-pointer">
                History
              </li>

              <li className="hover:text-orange-500 cursor-pointer">
                Biography
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-2xl mb-6">
              Subjects
            </h3>

            <ul className="space-y-4 text-lg text-gray-700">
              <li className="hover:text-orange-500 cursor-pointer">
                Heritage
              </li>

              <li className="hover:text-orange-500 cursor-pointer">
                Cinema
              </li>

              <li className="hover:text-orange-500 cursor-pointer">
                Psychology
              </li>

              <li className="hover:text-orange-500 cursor-pointer">
                Politics
              </li>

              <li className="hover:text-orange-500 cursor-pointer">
                Education
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-2xl mb-6">
              Authors
            </h3>

            <ul className="space-y-4 text-lg text-gray-700">
              <li className="hover:text-orange-500 cursor-pointer">
                Perumal Murugan
              </li>

              <li className="hover:text-orange-500 cursor-pointer">
                Jeyamohan
              </li>

              <li className="hover:text-orange-500 cursor-pointer">
                S. Ramakrishnan
              </li>

              <li className="hover:text-orange-500 cursor-pointer">
                G. Nagarajan
              </li>

              <li className="hover:text-orange-500 cursor-pointer">
                T. Paramasivan
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* ====================================== */}
      {/* CHILDREN BOOKS */}
      {/* ====================================== */}

      {openMenu ===
        "Children Books" && (
        <div
          onMouseEnter={() =>
            handleMouseEnter(
              "Children Books"
            )
          }

          onMouseLeave={
            handleMouseLeave
          }

          className="
            fixed

            left-1/2
            top-[145px]

            -translate-x-1/2

            w-[95vw]
            xl:w-[900px]

            max-w-[95vw]

            bg-white/95
            backdrop-blur-xl

            border border-white/70

            shadow-[0_25px_60px_rgba(0,0,0,0.18)]

            rounded-[32px]

            ring-1 ring-orange-100

            p-5 md:p-6 xl:p-8

            grid
            grid-cols-1
            sm:grid-cols-2
            xl:grid-cols-3

            gap-10

            animate-in
            fade-in
            zoom-in-95
            duration-200

            z-[9999]
          "
        >
          <div>
            <h3 className="font-black text-2xl mb-6">
              Age Groups
            </h3>

            <ul className="space-y-4 text-lg text-gray-700">
              <li>0 - 2 Years</li>
              <li>2 - 5 Years</li>
              <li>5 - 9 Years</li>
              <li>9 - 12 Years</li>
              <li>Teens</li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-2xl mb-6">
              Categories
            </h3>

            <ul className="space-y-4 text-lg text-gray-700">
              <li>Picture Book</li>
              <li>Activity Book</li>
              <li>Story Books</li>
              <li>Rhymes</li>
              <li>Comics</li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-2xl mb-6">
              Subjects
            </h3>

            <ul className="space-y-4 text-lg text-gray-700">
              <li>Science</li>
              <li>Fantasy</li>
              <li>Puzzles</li>
              <li>Adventure</li>
              <li>Coloring</li>
            </ul>
          </div>
        </div>
      )}

      {/* ====================================== */}
      {/* CATEGORIES */}
      {/* ====================================== */}

      {openMenu ===
        "Categories" && (
        <div
          onMouseEnter={() =>
            handleMouseEnter(
              "Categories"
            )
          }

          onMouseLeave={
            handleMouseLeave
          }

          className="
            fixed

            left-1/2
            top-[145px]

            -translate-x-1/2

            w-[95vw]
            xl:w-[650px]

            max-w-[95vw]

            bg-white/95
            backdrop-blur-xl

            border border-white/70

            shadow-[0_25px_60px_rgba(0,0,0,0.18)]

            rounded-[32px]

            ring-1 ring-orange-100

            p-6 xl:p-8

            grid
            grid-cols-1
            sm:grid-cols-2

            gap-10

            animate-in
            fade-in
            zoom-in-95
            duration-200

            z-[9999]
          "
        >
          <ul className="space-y-5 text-lg text-gray-800">
            <li>Novel</li>
            <li>Translation</li>
            <li>Travelogue</li>
            <li>History</li>
            <li>Biography</li>
          </ul>

          <ul className="space-y-5 text-lg text-gray-800">
            <li>Essay</li>
            <li>Interview</li>
            <li>Grammar</li>
            <li>Dictionary</li>
            <li>Speech</li>
          </ul>
        </div>
      )}

      {/* ====================================== */}
      {/* SUBJECTS */}
      {/* ====================================== */}

      {openMenu ===
        "Subjects" && (
        <div
          onMouseEnter={() =>
            handleMouseEnter(
              "Subjects"
            )
          }

          onMouseLeave={
            handleMouseLeave
          }

          className="
            fixed

            left-1/2
            top-[145px]

            -translate-x-1/2

            w-[95vw]
            xl:w-[650px]

            max-w-[95vw]

            bg-white/95
            backdrop-blur-xl

            border border-white/70

            shadow-[0_25px_60px_rgba(0,0,0,0.18)]

            rounded-[32px]

            ring-1 ring-orange-100

            p-6 xl:p-8

            grid
            grid-cols-1
            sm:grid-cols-2

            gap-10

            animate-in
            fade-in
            zoom-in-95
            duration-200

            z-[9999]
          "
        >
          <ul className="space-y-5 text-lg text-gray-800">
            <li>Heritage</li>
            <li>Cinema</li>
            <li>Psychology</li>
            <li>Education</li>
            <li>Healthcare</li>
          </ul>

          <ul className="space-y-5 text-lg text-gray-800">
            <li>Politics</li>
            <li>Social Justice</li>
            <li>Marxism</li>
            <li>Gandhi</li>
            <li>Anthropology</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BookFilterBar;