json.total_pages @bookings.total_pages
json.next_page @bookings.next_page
json.properties do 
    json.array! @bookings do |property_booking|
        json.id property_booking.property.id
        json.title property_booking.property.title
        json.city property_booking.property.city
        json.country property_booking.property.country
        json.username property_booking.user.username
        json.start_date property_booking.start_date
        json.end_date property_booking.end_date
        json.total_price property_booking.total_price
    end
end