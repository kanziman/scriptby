import { isFuture, isPast, isToday } from "date-fns";
import { useState } from "react";
import supabase from "../services/supabase";
import Button from "../ui/Button";
import { subtractDates } from "../utils/helpers";

import { useUser } from "../features/authentication/useUser";
import { signup } from "../services/apiAuth";
import { bookings } from "./data-bookings";
import { cabins } from "./data-cabins";
import { guests } from "./data-guests";
import { posts } from "./data-posts";

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  const { error } = await supabase.from("guests").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from("cabins").delete().gt("id", 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from("bookings").delete().gt("id", 0);
  if (error) console.log(error.message);
}
async function deleteScripts() {
  const { error } = await supabase.from("scripts").delete().gt("id", 0);
  if (error) console.log(error.message);
}
async function createScripts(user_id) {
  const newPosts = posts.map((post) => {
    return {
      ...post,
      user_id,
    };
  });
  const { count, error } = await supabase.from("scripts").insert(newPosts);
  if (error) console.log(error.message);
  console.log("inserted count:", count);
}
async function deletePosts() {
  const { error } = await supabase.from("posts").delete().gt("id", 0);
  if (error) console.log(error.message);
}
async function createPosts(user_id) {
  const newScripts = posts.map((script) => {
    return {
      ...script,
      user_id,
    };
  });
  const { count, error } = await supabase.from("posts").insert(newScripts);
  if (error) console.log(error.message);
  console.log("inserted count:", count);
}
// async function deleteProfiles() {
//   const { error } = await supabase.from("profiles").delete().gt("id", 0);
//   if (error) console.log(error.message);
// }
// async function createProfiles() {
//   signup({ username, email, password });

//   const { count, error } = await supabase.from("profiles").insert(profiles);
//   if (error) console.log(error.message);
//   console.log("inserted count:", count);
// }
async function deleteProfiles() {
  // 1. 먼저 테스트용 프로필 목록을 가져옵니다.
  const { data: profiles, error: fetchError } = await supabase
    .from("profiles")
    .select("id, email")
    .ilike("email", "testuser%@example.com");

  if (fetchError) {
    console.error("Error fetching test profiles:", fetchError.message);
    return;
  }

  if (profiles && profiles.length > 0) {
    // 2. 각 프로필에 해당하는 auth 사용자 삭제
    for (const profile of profiles) {
      const { error: authError } = await supabase.auth.admin.deleteUser(
        profile.id
      );
      if (authError) {
        console.error(
          `Error deleting auth user ${profile.id}:`,
          authError.message
        );
      } else {
        console.log(`Deleted auth user ${profile.id}`);
      }
    }
  } else {
    console.log("No test profiles found.");
  }

  // 3. profiles 테이블에서 테스트용 프로필 삭제
  const { count, error: deleteError } = await supabase
    .from("profiles")
    .delete()
    .ilike("email", "testuser%@example.com");

  if (deleteError) {
    console.error("Error deleting test profiles:", deleteError.message);
  } else {
    console.log("Deleted test profiles count:", count);
  }
}

async function createProfiles() {
  const testUsers = Array.from({ length: 10 }, (_, i) => {
    const index = i + 1;
    return {
      username: `testuser${index}`,
      email: `testuser${index}@example.com`,
      password: `testuser${index}`,
      play: i / 2 == 0 ? "student" : "requested",
    };
  });

  // 각 사용자에 대해 signup을 호출하고 profiles 객체를 생성
  const profilePromises = testUsers.map(async (userData) => {
    // signup 함수는 auth에 사용자를 생성하고 { user, error }를 반환한다고 가정
    const { user, error: signupError } = await signup(userData);
    if (signupError) {
      console.error(
        `Signup error for ${userData.email}: ${signupError.message}`
      );
      return null;
    }
    // auth의 user.id를 profiles의 id로 사용
    return {
      id: user.id,
      username: userData.username,
      email: userData.email,
      // 추가 필드가 필요하다면 여기에 추가
    };
  });

  const profilesToInsert = (await Promise.all(profilePromises)).filter(
    (profile) => profile !== null
  );

  // profiles 테이블에 한 번에 삽입 (배열 형태로 전달)
  const { count, error } = await supabase
    .from("profiles")
    .insert(profilesToInsert);
  if (error) {
    console.error("Insert error:", error.message);
  } else {
    console.log("Inserted count:", count);
  }
}

async function createGuests() {
  const { error } = await supabase.from("guests").insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from("cabins").insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase
    .from("guests")
    .select("id")
    .order("id");
  const allGuestIds = guestsIds.map((cabin) => cabin.id);
  const { data: cabinsIds } = await supabase
    .from("cabins")
    .select("id")
    .order("id");
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = "checked-out";
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = "unconfirmed";
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = "checked-in";

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  console.log(finalBookings);

  const { error } = await supabase.from("bookings").insert(finalBookings);
  if (error) console.log(error.message);
}

function Uploader() {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);
  }
  async function uploadScripts() {
    setIsLoading(true);
    await deleteScripts();
    await createScripts(user.id);
    setIsLoading(false);
  }
  async function uploadPosts() {
    setIsLoading(true);
    await deletePosts();
    await createPosts(user.id);
    setIsLoading(false);
  }
  async function uploadProfiles() {
    setIsLoading(true);
    await deleteProfiles();
    await createProfiles();
    setIsLoading(false);
  }

  return (
    <div
      style={{
        marginTop: "auto",
        backgroundColor: "#e0e7ff",
        padding: "8px",
        borderRadius: "5px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <h3>SAMPLE DATA</h3>

      <Button onClick={uploadAll} disabled={isLoading}>
        Upload ALL
      </Button>

      <Button onClick={uploadScripts} disabled={isLoading}>
        Upload scripts
      </Button>
      <Button onClick={uploadPosts} disabled={isLoading}>
        Upload posts
      </Button>
      <Button onClick={uploadProfiles} disabled={isLoading}>
        Upload profiles
      </Button>

      <Button onClick={uploadBookings} disabled={isLoading}>
        Upload bookings ONLY
      </Button>
    </div>
  );
}

export default Uploader;
