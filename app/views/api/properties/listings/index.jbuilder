json.total_pages @properties.total_pages
json.next_page @properties.next_page
json.properties do 
    json.array! @properties do |property|
        json.id property.id
        json.title property.title
        json.city property.city
        json.country property.country
        json.property_type property.property_type
        json.price_per_night property.price_per_night
        json.image_url property.image_url
        
        json.images do
          image_urls = []
          property.images.each do |image|
            image_urls.push(url_for(image))
          end
          json.array! image_urls
        end

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