json.property do
    json.id @property.id
    json.title @property.title
    json.description @property.description
    json.city @property.city
    json.country @property.country
    json.property_type @property.property_type
    json.price_per_night @property.price_per_night
    json.max_guests @property.max_guests
    json.bedrooms @property.bedrooms
    json.beds @property.beds
    json.baths @property.baths
    json.images do
      image_urls = []
      @property.images.each do |image|
        image_urls.push(url_for(image))
      end
      json.array! image_urls
    end

    json.user do
       json.id @property.user.id
       json.username @property.user.username 
       if @property.user.avatar.attached?
        json.avatar url_for(@property.user.avatar)
       else
        json.avatar nil
       end
    end
end