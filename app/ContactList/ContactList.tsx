import CustomInput from "@/components/customInput";
import { contacts } from "@/data/Contacts";
import { Contact } from "@/types/Contact";
import React, { useState } from "react";
import { SectionList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./ContactListStyle";

const ContactList = () => {
  const [search, setSearch] = useState("");

  const filteredContact = contacts.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  const grouped: Record<string, Contact[]> = {};

  for (const item of filteredContact) {
    const firstletter = item.name[0].toUpperCase();

    if (!grouped[firstletter]) {
      grouped[firstletter] = [];
    }

    grouped[firstletter].push(item);
  }
  const sections = Object.keys(grouped).map((key) => ({
    title: key,
    data: grouped[key],
  }));

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "top"]}>
      <Text style={styles.header}>Contact List</Text>

      <CustomInput
        label=""
        placeholder="🔍 Search contacts..."
        value={search}
        onChangeText={setSearch}
      />

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        stickySectionHeadersEnabled
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.contactCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {item.name.charAt(0).toUpperCase()}
              </Text>
            </View>

            <View style={styles.contactInfo}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.phone}>{item.phone}</Text>
            </View>
              <Text>{item.favorite === true && <Text>Fav.</Text>}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ContactList;
