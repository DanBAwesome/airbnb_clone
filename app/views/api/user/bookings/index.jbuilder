json.bookings do
    json.array! @bookings do |user_booking|
        json.id user_booking.id
        json.start_date user_booking.start_date
        json.end_date user_booking.end_date
        json.property_title user_booking.property.title
        json.property_city user_booking.property.city
        json.property_country user_booking.property.country
        json.image_url user_booking.property.image_url
        json.is_paid user_booking.is_paid
        
    end
end
