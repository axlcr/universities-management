class CreateUniversities < ActiveRecord::Migration[7.0]
  def change
    create_table :universities do |t|
      t.string :name, null: false
      t.string :location, null: false
      t.string :website, null: false
      t.string :contact_emails, array: true, default: [], null: false

      t.timestamps
    end
  end
end
