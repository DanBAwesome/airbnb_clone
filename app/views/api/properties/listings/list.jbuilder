json.total_pages @properties.total_pages
json.next_page @properties.next_page
json.properties do 
    json.array! @properties do |property|
        json.id property.id
        json.title property.title
        json.city property.city
        json.country property.country
        json.bookings do
            json.array! property.bookings do |booking|
                json.username booking.user.username
                json.start_date booking.start_date
                json.end_date booking.end_date
                json.total_price booking.total_price
            end
        end
    end
end